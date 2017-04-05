(function(){

    videoPlayer = {

        init: function() {

            this.video = document.querySelector('#movie');
            this.playButton = document.querySelector('#play-button');
            this.controlButton = document.querySelector('#control-button');
            this.currentTimeField = document.querySelector('#current-time');
            this.totalTime = document.querySelector('#total-time');
            this.progressBar = document.querySelector('#progress-bar');
            this.movieTitle = document.querySelector('#movie-title');

            this.video.onloadedmetadata = this.assignActions.bind(this);

            console.dir(this.video)

        },

        assignActions: function() {
                        
            this.togglePlayButtonVisibility();
            this.setMovieTitle();
            this.setDuration();

            this.video.onclick = this.togglePlaying.bind(this);
            this.video.ontimeupdate = this.setCurrentTimeValue.bind(this);
            this.video.onended = function() {

                this.setControlButtonIcon();
                this.setPlayButtonIcon("replay");
                this.togglePlayButtonVisibility();

            }.bind(this);

            this.controlButton.onclick = this.togglePlaying.bind(this);
            this.playButton.onclick = this.togglePlaying.bind(this);
            this.progressBar.oninput = this.setCurrentPlayTime.bind(this);
            
        },

        setCurrentTimeValue: function() {

            var time = this.video.currentTime;

            this.currentTimeField.innerHTML = this.stringifyTime(time);
            this.setProgressBarValue(time);

        },

        setCurrentPlayTime: function(e) {
            
            var percent = e.target.value,
                time = (this.duration * percent) / 100;

            this.video.currentTime = time;
            
        },

        setDuration: function() {

            this.duration = Math.round(this.video.duration);
            this.totalTime.innerHTML = this.stringifyTime(this.duration);

        },

        setMovieTitle: function() {
            
            var title = this.video.currentSrc;
            this.movieTitle.innerHTML = '<p> Żródło - ' + title + '</p>';

        },

        setProgressBarValue: function(time) {
            
            var currentTime = Math.round(time),
                percent = Math.round((currentTime / this.duration) * 100);

            this.progressBar.value = percent;

        },

        setPlayButtonIcon: function(iconName) {
            if(iconName){
                this.playButton.setAttribute("style", 'background: #000 url("img/'+ iconName +'-button.svg") no-repeat center; background-size: 75%;');
            }
        },

        setControlButtonIcon: function() {

            if(this.video.paused) {

                this.controlButton.setAttribute("style", 'background: url("img/play-button.svg") no-repeat center; background-size: 75%;');
                return;

            }

            this.controlButton.setAttribute("style", 'background: url("img/pause-button.svg") no-repeat center; background-size: 75%;');
        },

        togglePlaying: function() {

            if(this.video.currentTime === this.video.duration) {
                this.setPlayButtonIcon("play");
                this.togglePlayButtonVisibility();
            }

            if(this.video.paused) {
                this.video.play();
            } else {
                this.video.pause();
            }

            this.setControlButtonIcon();
            this.togglePlayButtonVisibility();
        },

        togglePlayButtonVisibility: function() {

            var vis = this.playButton.style.visibility;

            if(vis === "hidden" || vis === "") {
                this.playButton.style.visibility = "visible";
            } else {
                this.playButton.style.visibility = "hidden";
            }
        },

        stringifyTime: function(time) {

            var rounded = Math.round(time);

            if(rounded < 60) {

                if(rounded < 10) {
                    return "0:0" + rounded;
                } else {
                    return "0:" + rounded;
                }

            } else {
                return (rounded / 60) + ":00";
            }

        }
    };

    videoPlayer.init();

})();