import {Component, OnInit, Input} from '@angular/core'

@Component({
  selector: 'log',
  templateUrl: './log.component.html',
  
})
export class LogComponent implements OnInit{
  _logs : any = [];
  intervalId: any;
  
  @Input() set logs(valor){
    this._logs = valor;

    if(this.intervalId){
      clearInterval(this.intervalId);
      this.ngOnInit();
    }
  }
  
  ngOnInit(){
    this.intervalId = setInterval(() => {
      if(this._logs.length) {
        this._logs.splice(0,1);
      }
    }, 3000);
  }

  getTexto(texto){
    switch (typeof texto){
      case 'object':
            return JSON.stringify(texto);
      default:
          return texto;
    }

  }

}
