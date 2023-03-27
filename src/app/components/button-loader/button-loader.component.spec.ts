import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageMock } from 'src/mock/page.mock';
import { ButtonLoaderComponent } from './button-loader.component';

describe('ButtonLoaderComponent', () => {
  let component: ButtonLoaderComponent;
  let fixture: ComponentFixture<ButtonLoaderComponent>;
  let page: PageMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonLoaderComponent);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('given is disabled is true, then button should be disabled', () => {
    component.isDisabled = true;
    fixture.detectChanges();

    expect(page.querySelector('[test-id="button"]').disabled).toBeTruthy();
  })

  it('given is disabled is false, then button should be enabled', () => {
    component.isDisabled = false;
    fixture.detectChanges();

    expect(page.querySelector('[test-id="button"]').disabled).toBeFalsy();
  })

  describe('given is loading', () => {

    beforeEach(() => {
      component.isLoading = true;
      fixture.detectChanges();
    })

    it('then hide button', () => {
      expect(page.querySelector('[test-id="button"]')).toBeNull();
    })

    it('then show loader', () => {
      expect(page.querySelector('[test-id="loader"]')).not.toBeNull();
    })

  })

  describe('given is not loading', () => {

    beforeEach(() => {
      component.isLoading = false;
      fixture.detectChanges();
    })

    it('then show button', () => {
      expect(page.querySelector('[test-id="button"]')).not.toBeNull();
    })

    it('then hide loader', () => {
      expect(page.querySelector('[test-id="loader"]')).toBeNull();
    })

  })

  it('given user clicks on button, then emit click event', () => {
    spyOn(component.onClick, 'emit');

    page.querySelector('[test-id="button"]').click();
    fixture.detectChanges();

    expect(component.onClick.emit).toHaveBeenCalled();
  })

});
