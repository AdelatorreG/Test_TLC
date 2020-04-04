import { Component, NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { TemplateDefinitionBuilder } from '@angular/compiler/src/render3/view/template';

am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  chart: any;
  Category: string;
  Title='Pie Chart for December';
  PatentListDecember = {
    name:"PatentListDecember",

    children:[{
      Patente: '3389',
      Agente: 'JUAN DE JESUS BARAJAS ACEVES',
      Documentos: 2,
      Title:'',
      Tipo: 'Exportación'
    },
    {
      Patente: '3979',
      Agente: 'MARIA DEL SOL MACIAS GONZALEZ',
      Documentos: 2,
      Title:'',
      Tipo: 'Importación'
    },
    {
      Patente: '3932',
      Agente: 'MIGUEL SEGUNDO SALINAS GARZA',
      Documentos: 3,
      Title:'',
      Tipo: 'Importación'
    },
    {
      Patente: '3573',
      Agente: 'JUAN DE JESUS BARAJAS HILL',
      Documentos: 4,
      Title:'',
      Tipo: 'Importación'
    },
    {
      Patente: '3389',
      Agente: 'JUAN DE JESUS BARAJAS ACEVES',
      Documentos: 4,
      Title:'',
      Tipo: 'Importación'
    },
    {
      Patente: '3573',
      Agente: 'JUAN DE JESUS BARAJAS HILL',
      Documentos: 41,
      Title:'',
      Tipo: 'Exportación'
    }]
  
}

  PatentListJanuary  = {
    name:"PatentListJanuary",
    children:
    [{
      Patente: '3573',
      Agente: 'JUAN DE JESUS BARAJAS HILL',
      Documentos: 25,
      Title:'',
      Tipo: 'Exportación'
    },
    {
      Patente: '3389',
      Agente: 'JUAN DE JESUS BARAJAS ACEVES',
      Documentos: 1,
      Title:'',
      Tipo: 'Exportación'
    },
    {
      Patente: '3979',
      Agente: 'MARIA DEL SOL MACIAS GONZALEZ',
      Documentos: 3,
      Title:'',
      Tipo: 'Importación'
    },
    {
      Patente: '3932',
      Agente: 'MIGUEL SEGUNDO SALINAS GARZA',
      Documentos: 7,
      Title:'',
      Tipo: 'Importación'
    },
    {
      Patente: '3929',
      Agente: 'JOSE ANTONIO ROCHA CRUZ',
      Documentos: 1,
      Title:'',
      Tipo: 'Importación'
    },
    {
      Patente: '3573',
      Agente: ' JUAN DE JESUS BARAJAS HILL',
      Documentos: 14,
      Title:'',
      Tipo: 'Importación'
    },
    {
      Patente: '3389',
      Agente: 'JUAN DE JESUS BARAJAS ACEVES',
      Documentos: 15,
      Title:'',
      Tipo: 'Importación'
    }]
  }

    ;
  constructor(private zone: NgZone) { }
  ngOnInit(){
    for(let Patent of this.PatentListDecember.children){
      Patent.Title=Patent.Patente + ' ' + Patent.Tipo;
    }

    for(let Patent of this.PatentListJanuary.children){
      Patent.Title=Patent.Patente + ' ' + Patent.Tipo;
    }
  }

  ngAfterViewInit() {
    this.Category = 'Pie';
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.PieChart);
      chart.data = this.PatentListDecember.children;
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      // pieSeries.dataFields.value = "Tipo";
      pieSeries.dataFields.category = "Title";
      pieSeries.dataFields.value = "Documentos";
      this.chart = chart;
    });
  }

  toDecemberPie() {
    this.Category = 'Pie';
    this.Title='Pie Chart for December';

    let chart = am4core.create("chartdiv", am4charts.PieChart);
    chart.data = this.PatentListDecember.children;
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    // pieSeries.dataFields.value = "Tipo";
    pieSeries.dataFields.category = "Title";
    pieSeries.dataFields.value = "Documentos";
    this.chart = chart;
  }


  toJanuaryTreeMap() {
    this.Title='Tree Chart for January'
    this.Category = 'Tree';

    let chart = am4core.create("chartdiv", am4charts.TreeMap);
    chart.data = this.PatentListJanuary.children;
    chart.dataFields.value = "Documentos";
    chart.dataFields.name = "Title";
    this.chart = chart;
  }


  toBothinTree() {
    this.Category = 'BothTree';
    this.Title='Both Months in Tree';
    let chart = am4core.create("chartdiv", am4charts.TreeMap);
    chart.data = [this.PatentListDecember,this.PatentListJanuary];
    chart.dataFields.children = "children";
    chart.dataFields.value = "Documentos";
    chart.dataFields.name = "Title";
    this.chart = chart;
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
