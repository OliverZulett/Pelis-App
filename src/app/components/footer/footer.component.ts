import { Component, OnInit } from '@angular/core';

import { faGithub, faFacebook, faTwitter, faYoutube, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  githubIcon = faGithub;
  facebookIcon = faFacebook;
  twitterIcon = faTwitter;
  youtubeIcon = faYoutube;
  instagramIcon = faInstagram;
  linkedinIcon = faLinkedin;
}
