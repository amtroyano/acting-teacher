import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatTab } from '@angular/material/tabs';
import { Corps } from 'src/app/core/models/corps/corps.model';
import { IItemsMovedEvent } from 'src/app/core/models/dual-list-box.model';
import { PositionItem } from 'src/app/core/models/positions/positionitem.models';
import { Positions } from 'src/app/core/models/positions/positions.model';
import { Corp } from 'src/app/core/models/user/corp.model';
import { Position } from 'src/app/core/models/user/position.model';
import { User } from 'src/app/core/models/user/user.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  @Input() valueField = 'id';
  @Input() textField = 'name';
  @Input() set availables(items: Array<{}>) {
    this.availableItems = [...this.user.corps]};
  
  @Input() set selects(items: Array<{}>) {
    this.selectedItems = [...this.corps]};

  @Input() set availablesPositions(items: Array<{}>) {
    this.availablePositionsItems = [...this.userPositions]};
  
  @Input() set selectedPositions(items: Array<{}>) {
    this.selectedPositionsItems = [...this.positions]};

  @Output() itemsMoved: EventEmitter<IItemsMovedEvent> = new EventEmitter<IItemsMovedEvent>();
  @Output() positionsMoved: EventEmitter<IItemsMovedEvent> = new EventEmitter<IItemsMovedEvent>();

  user: User;
  corps: Array<Corp>;
  userPositions: Array<PositionItem>;
  positions: Array<PositionItem>;
  availableItems: Array<Corp> = [];
  selectedItems: Array<Corp> = [];
  availablePositionsItems: Array<PositionItem> = [];
  selectedPositionsItems: Array<PositionItem> = [];
  selectedCorp: Corp;
 
  constructor(private dataService: DataService) {
    this.user = new User(null);
    this.corps = new Corps().corps;
    this.positions = new Positions().positions;
    this.userPositions = new Array<PositionItem>();
  }
  
  ngOnInit() {
    if (this.dataService.data) {
      this.user = this.dataService.data;
      this.corps = this.corps.filter(corp => {
        let tmpCorp = this.user.corps.find(userCorp => userCorp.corpId == corp.corpId);
        if (tmpCorp) {
          return false;
        }
        return true;
      });
    }
  }

  drop(event: CdkDragDrop<Corp[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.itemsMoved.emit({
      available: this.availableItems,
      selected: this.selectedItems,
      movedItems: event.container.data.filter((v, i) => i === event.currentIndex),
      from: 'available',
      to: 'selected',
    });
  }

  addPositions(event: CdkDragDrop<PositionItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let positionItem = this.positions[event.previousIndex];
      let position = new Position(positionItem.positionId, positionItem.desc);
      if (!this.selectedCorp.positions.find(pos => pos.positionId === positionItem.positionId)) {
        this.selectedCorp.positions.splice(event.currentIndex, 0, );
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      }
    }
    this.positionsMoved.emit({
      available: this.availablePositionsItems,
      selected: this.selectedPositionsItems,
      movedItems: event.container.data.filter((v, i) => i === event.currentIndex),
      from: 'available',
      to: 'selected',
    });
  }

  removePositions(event: CdkDragDrop<PositionItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.selectedCorp.positions.splice(event.previousIndex, 1);
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.positionsMoved.emit({
      available: this.availablePositionsItems,
      selected: this.selectedPositionsItems,
      movedItems: event.container.data.filter((v, i) => i === event.currentIndex),
      from: 'available',
      to: 'selected',
    });
  }

  selectCorp(event: Event, corp: Corp) {
    event.preventDefault();
    this.selectedCorp = corp;
    let container = event.currentTarget as HTMLElement;
    container.classList.add('selected');
    this.userPositions = new Array<PositionItem>();
    for (let i = 0; i < corp.positions.length; i++) {
      this.userPositions.push(new PositionItem(corp.positions[i].positionId, corp.positions[i].desc, corp.corpId));
    }
    
  }
}
