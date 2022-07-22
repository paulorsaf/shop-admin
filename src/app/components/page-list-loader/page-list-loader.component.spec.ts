import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListLoaderComponent } from './page-list-loader.component';

describe('PageListLoaderComponent', () => {
  let component: PageListLoaderComponent;
  let fixture: ComponentFixture<PageListLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageListLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageListLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
