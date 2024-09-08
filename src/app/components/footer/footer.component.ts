import { Component, OnInit } from '@angular/core';

import { faGithub, faFacebook, faTwitter, faYoutube, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: true,
    imports: [FaIconComponent]
})
export class FooterComponent {

  githubIcon = faGithub;
  facebookIcon = faFacebook;
  twitterIcon = faTwitter;
  youtubeIcon = faYoutube;
  instagramIcon = faInstagram;
  linkedinIcon = faLinkedin;
}
