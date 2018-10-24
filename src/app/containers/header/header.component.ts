import {Component} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  search: string;

  logoUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKIYZQyXoBPKJcHDH_ORw-TshJc4kJQCF139xKqNAxJVH6OBXN';
  title = 'logo';
}
