import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { EmployeeDashboardComponent } from './employee-dashboard.component';

describe('EmployeeDashboardComponent', () => {
  let component: EmployeeDashboardComponent;
  let fixture: ComponentFixture<EmployeeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeDashboardComponent],
      imports: [CommonModule] // Include other modules if needed
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
