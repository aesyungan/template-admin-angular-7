import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAuthenticationComponent } from './template-authentication.component';

describe('TemplateAuthenticationComponent', () => {
  let component: TemplateAuthenticationComponent;
  let fixture: ComponentFixture<TemplateAuthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateAuthenticationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
