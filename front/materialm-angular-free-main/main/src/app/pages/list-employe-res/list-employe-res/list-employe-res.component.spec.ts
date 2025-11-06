import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmployeResComponent } from './list-employe-res.component';

describe('ListEmployeResComponent', () => {
  let component: ListEmployeResComponent;
  let fixture: ComponentFixture<ListEmployeResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEmployeResComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEmployeResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
