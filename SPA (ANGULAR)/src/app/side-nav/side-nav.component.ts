import { Component, OnInit } from '@angular/core';
import * as $ from 'node_modules/jquery'


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  visibleSidebar1:boolean = true;
  constructor() { }

  ngOnInit() {
    $(".dropdown-btn").click(()=>{
      $(".dropdown-container").fadeToggle(100);
    })
  }
show(){
  this.visibleSidebar1 = !this.visibleSidebar1;
}

}
