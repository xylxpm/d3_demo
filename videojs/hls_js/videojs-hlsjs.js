(function (window, videojs, Hls) {
  'use strict';

  /**
  * Initialize the plugin.
  * @param options (optional) {object} configuration for the plugin
  */
  var Component = videojs.getComponent('Component'),
      Tech = videojs.getTech('Tech'),
      Html5 = videojs.getComponent('Html5');

  var Hlsjs = videojs.extend(Html5, {
    initHls_: function() {
      this.options_.hls.autoStartLoad = false;
      this.hls_ = new Hls(this.options_.hls);

      this.bindExternalCallbacks_();

      this.hls_.on(Hls.Events.MEDIA_ATTACHED, videojs.bind(this, this.onMediaAttached_));
      this.hls_.on(Hls.Events.MANIFEST_PARSED, videojs.bind(this, this.onManifestParsed_));
      this.hls_.on(Hls.Events.MANIFEST_LOADED, videojs.bind(this, this.initAudioTracks_));
      this.hls_.on(Hls.Events.MANIFEST_LOADED, videojs.bind(this, this.initTextTracks_));
      this.hls_.on(Hls.Events.LEVEL_UPDATE, videojs.bind(this, this.updateTimeRange_));
      this.hls_.on(Hls.Events.ERROR, videojs.bind(this, this.onError_));

      this.el_.addEventListener('error', videojs.bind(this, this.onMediaError_));

      this.currentLevel_ = undefined;
      this.setLevelOnLoad_ = undefined;
      this.lastLevel_ = undefined;
      this.timeRange_ = undefined;
      this.starttime_ = -1;
      this.levels_ = [];

      this.hls_.attachMedia(this.el_);
    },

    bindExternalCallbacks_: function() {
      var resolveCallbackFromOptions = function(evt, options, hls) {
        var capitalize = function(str) {
          return str.charAt(0).toUpperCase() + str.slice(1);
        }, createCallback = function(callback, hls) {
          return function(evt, data) {
            callback(hls, data);
          };
        }, callback = options['on' + capitalize(evt)];

        if (callback && typeof callback === 'function') {
          return createCallback(callback, hls);
        }
      }, key;

      for(key in Hls.Events) {
        if (Object.prototype.hasOwnProperty.call(Hls.Events, key)) {
          var evt = Hls.Events[key],
              callback = resolveCallbackFromOptions(evt, this.options_, this.hls_);

          if (callback) {
            this.hls_.on(evt, videojs.bind(this, callback));
          }
        }
      }
    },

    onMediaAttached_: function() {
      this.triggerReady();
    },

    updateTimeRange_: function() {
      var range;

      if (this.hls_ && this.hls_.currentLevel >= 0) {
        var details = this.hls_.levels[this.hls_.currentLevel].details;

        if (details) {
            var fragments = details.fragments, isLive = details.live,
                firstFragmentIndex = !isLive ? 0 : 2,
                firstFragment = fragments[firstFragmentIndex > fragments.length ? 0 : firstFragmentIndex],
                liveSyncDurationCount = this.hls_.config.liveSyncDurationCount,
                lastFragmentIndex = !isLive ? fragments.length - 1 : fragments.length - liveSyncDurationCount,
                lastFragment = fragments[lastFragmentIndex < 0 ? 0 : lastFragmentIndex];

            range =  {
              start: firstFragment.start,
              end: lastFragment.start + lastFragment.duration
            };
        }
      }

      if (!range && !this.timeRange_) {
        var duration = Html5.prototype.duration.apply(this);
        if (duration && !isNaN(duration)) {
          range = {start: 0, end: duration};
        }
      } else if (!range) {
        range = this.timeRange_;
      }

      this.timeRange_ = range;
    },

    play: function() {
      if (this.preload() === 'none' && !this.hasStarted_) {
        if (this.setLevelOnLoad_) {
          this.setLevel(this.setLevelOnLoad_);
        }
        this.hls_.startLoad(this.starttime());
      }

      Html5.prototype.play.apply(this);
    },

    duration: function() {
      this.updateTimeRange_();
      return (this.timeRange_) ? this.timeRange_.end - this.timeRange_.start : undefined;
    },

    currentTime: function() {
      this.updateTimeRange_();
      if (this.hls_.currentLevel !== this.lastLevel_) {
        this.trigger('levelswitched');
      }

      this.lastLevel_ = this.hls_.currentLevel;
      return Html5.prototype.currentTime.apply(this);
    },

    seekable: function() {
      if (this.timeRange_) {
        return {
          start: function() { return this.timeRange_.start; }.bind(this),
          end: function() { return this.timeRange_.end; }.bind(this),
          length: 1
        };
      } else {
        return {length: 0};
      }
    },

    onManifestParsed_: function() {
      var hasAutoLevel = !this.options_.disableAutoLevel, startLevel, autoLevel;

      this.parseLevels_();

      if (this.levels_.length > 0) {
        if (this.options_.setLevelByHeight) {
          startLevel = this.getLevelByHeight_(this.options_.setLevelByHeight);
          autoLevel = false;
        } else if (this.options_.startLevelByHeight) {
          startLevel = this.getLevelByHeight_(this.options_.startLevelByHeight);
          autoLevel = hasAutoLevel;
        } 

        if (!hasAutoLevel && (!startLevel || startLevel.index === -1)) {
          startLevel = this.levels_[this.levels_.length-1];
          autoLevel = false;
        }
      } else if (!hasAutoLevel) {
        startLevel = {index: this.hls_.levels.length-1};
        autoLevel = false;
      }

      if (startLevel) {
        this.hls_.startLevel = startLevel.index;
      }

      if (this.preload() !== 'none') {
        if (!autoLevel && startLevel) {
          this.setLevel(startLevel);
        }
        this.hls_.startLoad(this.starttime());
      } else if (!autoLevel && startLevel) {
        this.setLevelOnLoad_ = startLevel;
        this.currentLevel_ = startLevel;
      }

      if (this.autoplay() && this.paused()) {
        this.play();
      }

      this.trigger('levelsloaded');
    },

    initAudioTracks_: function() {
      var i, toRemove = [], vjsTracks = this.audioTracks(),
          hlsTracks = this.hls_.audioTracks,
          hlsGroups = [],
          hlsGroupTracks = [],
          isEnabled = function(track) {
            var hls = this.hls_;
            return track.groups.reduce(function (acc, g) {
              return acc || g.id === hls.audioTrack;
            }, false);
          },
          modeChanged = function(tech) {
            if (this.enabled) {
              var level = tech.currentLevel();
              var id = this.__hlsGroups.reduce(function(acc, group){
                if (group.groupId === level.audio) {
                  acc = group.id;
                }
                return acc;
              }, this.__hlsTrackId);
              if (id !== this.__hlsTrackId) {
                tech.hls_.audioTrack = id;
              }

            }
          };

      var g = 0;
      hlsTracks.forEach(function(track){
        var name = (typeof track.groupId !== 'undefined') ? track.name : 'no-groups';
        var group = { id: track.id, groupId: track.groupId };
        if (typeof hlsGroups[name] === 'undefined') {
          hlsGroups[name] = g;
          hlsGroupTracks[g] = [];
          var t = track;
          t.groups = [];
          t.groups.push(group);
          hlsGroupTracks[g] = t;
          g++;
        } else {
          hlsGroupTracks[hlsGroups[track.name]].groups.push(group);
        }
      });

      for (i = 0; i < vjsTracks.length; i++) {
        var track = vjsTracks[i];
        if (track.__hlsTrackId !== undefined) {
            toRemove.push(track);
        }
      }

      for (i = 0; i < toRemove.length; i++) {
        vjsTracks.removeTrack_(toRemove[i]);
      }

      for (i = 0; i < hlsGroupTracks.length; i++) {
        var hlsTrack = hlsGroupTracks[i];
        var vjsTrack = new videojs.AudioTrack({
          type: hlsTrack.type,
          language: hlsTrack.lang,
          label: hlsTrack.name,
          enabled: isEnabled.bind(this, hlsTrack)()
        });

        vjsTrack.__hlsTrackId = hlsTrack.id;
        vjsTrack.__hlsGroups = hlsTrack.groups;
        vjsTrack.addEventListener('enabledchange', modeChanged.bind(vjsTrack, this));
        vjsTracks.addTrack(vjsTrack);
      }
    },

    initTextTracks_: function() {
      var i, toRemove = [], vjsTracks = this.textTracks(),
          hlsTracks = this.hls_.subtitleTracks,
          modeChanged = function() {
            this.tech_.el_.textTracks[this.__hlsTrack.vjsId].mode = this.mode;
          };
      for (i = 0; i < vjsTracks.length; i++) {
        var track = vjsTracks[i];
        if (track.__hlsTrack !== undefined) {
            toRemove.push(track);
        }
      }

      for (i = 0; i < toRemove.length; i++) {
        vjsTracks.removeTrack_(toRemove[i]);
      }
      var hlsHasDefaultTrack = false;
      for (i = 0; i < hlsTracks.length; i++) {
        var hlsTrack = hlsTracks[i],
            vjsTrack = new videojs.TextTrack({
              srclang: hlsTrack.lang,
              label: hlsTrack.name,
              mode: ((typeof hlsTrack.default !== 'undefined') && hlsTrack.default && !hlsHasDefaultTrack) ? 'showing' : 'hidden',
              tech: this
            });
        if ((typeof hlsTrack.default !== 'undefined') && hlsTrack.default) {
          hlsHasDefaultTrack = true;
        }
        vjsTrack.__hlsTrack = hlsTrack;
        vjsTrack.__hlsTrack.vjsId = i+1;
        vjsTrack.addEventListener('modechange', modeChanged);
        vjsTracks.addTrack_(vjsTrack);
      }
      if (hlsHasDefaultTrack) {
        this.trigger('texttrackchange');
      }
    },

    getLevelByHeight_: function (h) {
      var i, result;
      for (i = 0; i < this.levels_.length; i++) {
        var cLevel = this.levels_[i],
            cDiff = Math.abs(h - cLevel.height),
            pLevel = result,
            pDiff = (pLevel !== undefined) ? Math.abs(h - pLevel.height) : undefined;

        if (pDiff === undefined || (pDiff > cDiff)) {
          result = this.levels_[i];
        }
      }
      return result;
    },

    parseLevels_: function() {
      this.levels_ = [];
      this.currentLevel_ = undefined;

      if (this.hls_.levels) {
        var i;

        if (!this.options_.disableAutoLevel) {
          this.levels_.push({
            label: 'auto',
            index: -1,
            height: -1
          });
          this.currentLevel_ = this.levels_[0];
        }

        for (i = 0; i < this.hls_.levels.length; i++) {
          var level = this.hls_.levels[i];
          var lvl = null;
          if (level.height) {
            lvl = {
                label: level.height + 'p',
                index: i,
                height: level.height
            };
          }
          if (typeof level.attrs.AUDIO !== 'undefined') {
            lvl = lvl || {};
            lvl.index =  i;
            lvl.audio = level.attrs.AUDIO;
          }
          if (lvl) {
            this.levels_.push(lvl);
          }
        }

        if (this.levels_.length <= 1) {
          this.levels_ = [];
          this.currentLevel_ = undefined;
        }
      }
    },

    setSrc: function(src) {
      if (this.hls_) {
        this.hls_.destroy();
      }

      if (this.currentLevel_) {
        this.options_.setLevelByHeight = this.currentLevel_.height;
      }

      this.initHls_();
      this.hls_.loadSource(src);
    },

    onMediaError_: function(event) {
      var error = event.currentTarget.error;
      if (error && error.code === error.MEDIA_ERR_DECODE) {
        var data = {
          type: Hls.ErrorTypes.MEDIA_ERROR,
          fatal: true,
          details: 'mediaErrorDecode'
        };

        this.onError_(event, data);
      }
    },

    onError_: function(event, data) {
      var abort = [Hls.ErrorDetails.MANIFEST_LOAD_ERROR,
                   Hls.ErrorDetails.MANIFEST_LOAD_TIMEOUT,
                   Hls.ErrorDetails.MANIFEST_PARSING_ERROR];

      if (abort.indexOf(data.details) >= 0) {
        videojs.log.error('HLSJS: Fatal error: "' + data.details + '", aborting playback.');
        this.hls_.destroy();
        this.error = function() {
          return {code: 3};
        };
        this.trigger('error');
      } else {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              videojs.log.warn('HLSJS: Network error: "' + data.details + '", trying to recover...');
              this.hls_.startLoad();
              this.trigger('waiting');
              break;

            case Hls.ErrorTypes.MEDIA_ERROR:
              var startLoad = function() {
                this.hls_.startLoad();
                this.hls_.off(Hls.Events.MEDIA_ATTACHED, startLoad);
              }.bind(this);

              videojs.log.warn('HLSJS: Media error: "' + data.details + '", trying to recover...');
              this.hls_.swapAudioCodec();
              this.hls_.recoverMediaError();
              this.hls_.on(Hls.Events.MEDIA_ATTACHED, startLoad);

              this.trigger('waiting');
              break;
            default:
              videojs.log.error('HLSJS: Fatal error: "' + data.details + '", aborting playback.');
              this.hls_.destroy();
              this.error = function() {
                return {code: 3};
              };
              this.trigger('error');
              break;
          }
        }
      }
    },

    currentLevel: function() {
      var hasAutoLevel = !this.options_.disableAutoLevel;
      return (this.currentLevel_ && this.currentLevel_.index === -1) ?
                this.levels_[(hasAutoLevel) ? this.hls_.currentLevel+1  : this.hls_.currentLevel] :
                this.currentLevel_;
    },

    isAutoLevel: function() {
      return this.currentLevel_ && this.currentLevel_.index === -1;
    },

    setLevel: function(level) {
      this.currentLevel_ = level;
      this.setLevelOnLoad_ = undefined;
      this.hls_.currentLevel = level.index;
      this.hls_.loadLevel = level.index;
    },

    getLevels: function() {
      return this.levels_;
    },

    supportsStarttime: function() {
      return true;
    },

    starttime: function(starttime) {
      if (starttime) {
        this.starttime_ = starttime;
      } else {
        return this.starttime_;
      }
    },

    dispose: function() {
      if (this.hls_) {
        this.hls_.destroy();
      }
      return Html5.prototype.dispose.apply(this);
    }
  });

  Hlsjs.isSupported = function() {
    return Hls.isSupported();
  };

  Hlsjs.canPlaySource = function(source) {
    return !(videojs.options.hlsjs.favorNativeHLS && Html5.canPlaySource(source)) &&
      (source.type && /^application\/(?:x-|vnd\.apple\.)mpegurl/i.test(source.type)) &&
      Hls.isSupported();
  };

  videojs.options.hlsjs = {
    /**
     * Whether to favor native HLS playback or not.
     * @type {boolean}
     * @default true
     */
    favorNativeHLS: true,
    hls: {}
  };

  Component.registerComponent('Hlsjs', Hlsjs);
  Tech.registerTech('hlsjs', Hlsjs);
  videojs.options.techOrder.push('hlsjs');

})(window, window.videojs, window.Hls);
