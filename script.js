const container = document.querySelector(".container");
class Timer {
    constructor (setMinutes, setSeconds, launch, delay, id,intervalTime) {
        this.setMinutes = setMinutes;
        this.setSeconds = setSeconds;
        this.launch = launch;
        this.delay = delay;
        this.id = id;
        this.intervalTime = intervalTime;
        this.render();
     
    }
    createTimer (){
        this.timer = document.createElement('div');
        this.timer.textContent = `${this.setMinutes}:${this.setSeconds}`;
        this.timer.classList.add('timer');
        return this.timer;
    }
    createBtnStart () {
        this.btnStart = document.createElement('button');
        this.btnStart.textContent = 'Start';
        this.btnStart.classList.add('btn');
        return this.btnStart;
       
    }
    createBtnStop () {
        this.btnStop = document.createElement('button');
        this.btnStop.textContent = 'Stop';
        this.btnStop.classList.add('btn');
        return this.btnStop;
    }
    createBtnReset() {
        this.btnReset = document.createElement('button');
        this.btnReset.textContent = 'Reset';
        this.btnReset.classList.add('btn');
        return this.btnReset;
    }
    createLine () {
        this.line = document.createElement('div');
        const moveLine = document.createElement('div');
        this.line.append(moveLine);
        this.line.classList.add('line');
        moveLine.classList.add(`timeline-${this.id}`);
        return moveLine, this.line;
    }
    createElements () {
        container.append(this.createTimer());
        container.append(this.createBtnStart());
        container.append(this.createBtnStop());
        // container.append(this.createBtnReset());
        container.append(this.createLine());
    }
    changeInterval () {
        const Width = document.querySelector(`.timeline-${this.id}`);
        const currentWidth = Width.offsetWidth;
        const setTime = Math.round(((this.setMinutes * 60) +  this.setSeconds) / this.intervalTime);
        let startWidth = currentWidth;
        const percent = Math.round(currentWidth/setTime);
        this.interval = setInterval(function() {
        startWidth = startWidth - percent;
        Width.style.width = `${startWidth}px`;
        },this.delay);
       
    }
    changeTimer() {
	    this.timeInterval = setInterval(() =>  {
	        if (this.setMinutes === 0 && this.setSeconds === 0) {
                clearInterval(this.timeInterval);
            } 
            else {
	            if (this.setSeconds <= 0) {
	                this.setSeconds = 60;
	                this.setMinutes--;
                } 
                else {
	                this.setSeconds = this.setSeconds - this.intervalTime ;
	            }
	        	this.timer.innerHTML = `${this.setMinutes}:` + (this.setSeconds < 10 ? "0" : "") + String(this.setSeconds);
	        }
	    }, this.delay); 
    }
    btnResetPar () {
        const Width = document.querySelector(`.timeline-${this.id}`);
        Width.style.width = '100%';
        this.setSeconds = this.setSeconds;
    }
    stopTimer () {
        clearInterval(this.interval);
        clearInterval(this.timeInterval);
    }
    StartTimer () {
        this.interval;
        this.timeInterval;
    }
    autoPlay () {
        if(this.launch === true) {
            this.StartTimer();
        } else {
            this.stopTimer();
        }
    }
    btnStartMove () {
        this.changeInterval();
        this.changeTimer();
    }
    render () {
        this.createElements();
        this.changeInterval();
        this.changeTimer();
        this.autoPlay();
        this.btnStop.addEventListener('click', this.stopTimer.bind(this));
        this.btnStart.addEventListener('click', this.btnStartMove.bind(this));
    }
}
const timer = new Timer(0,15,false,1000,0,1);
const timer1 = new Timer(0,18,true,2000,1,2);

