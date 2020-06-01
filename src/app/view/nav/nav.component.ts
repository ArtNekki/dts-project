import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ActivationEnd, NavigationEnd, Params, Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, AfterViewInit {
  @ViewChild('nav', {read: ElementRef}) nav: ElementRef;
  currentFragment = '';
  isSticky = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.currentFragment = this.route.snapshot.fragment;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const target = this.router.parseUrl(event.url).fragment;
        this.currentFragment = target;

        if (target) {
          this.scrollToSection(target);
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.setStickyMenu();

    setTimeout(() => {
      this.scrollToSection(this.currentFragment);
    }, 0);
  }

  @HostListener('window:scroll', ['$event'])

  scroll() {
    this.setStickyMenu();
    this.removeFragment();
  }

  scrollToSection(target) {
    const section = document.getElementById(target);

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }

  setStickyMenu() {
    if (this.nav.nativeElement.getBoundingClientRect().top < -30) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }

  removeFragment() {
    if (this.nav.nativeElement.getBoundingClientRect().top === 0) {
      this.router.navigate(['.'], {relativeTo: this.route, queryParams: []});
    }
  }

  openMenu() {
    document.documentElement.classList.add('menu--opened');
    document.documentElement.classList.add('modal--opened');
  }

  closeMenu() {
    document.documentElement.classList.remove('menu--opened');
    document.documentElement.classList.remove('modal--opened');
  }
}
