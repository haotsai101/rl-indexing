import { Component, OnInit } from '@angular/core';

import { LinksService } from '../services/links/links.service';

declare type section = {
  title: string,
  links: {
    href: string,
    name: string
  }[]
}

/**
 * Footer page for displaying links to the other fhtl websites.
 */

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public footer: section[];

  constructor(private links: LinksService) {
    this.footer = [
      {
        title: 'Support Fhtl',
        links: [
          {
            href: links.FHTL.home,
            name: 'Home'
          },
          {
            href: links.FHTL.contact, 
            name: 'Contact'
          },
          {
            href: links.FHTL.people, 
            name: 'People'
          },
          {
            href: links.FHTL.donate,
            name: 'Donate'
          }
        ]
      },
      {
        title: 'Research',
        links: [
          {
            href: links.FHTL.relativeFinder,
            name: 'Relative Finder'
          },
          {
            href: links.FHTL.virtualPedigreee, 
            name: 'Virtual Pedigree'
          },
          {
            href: links.FHTL.descendancyExplorer,
            name: 'Descendancy Explorer'
          },
          {
            href: links.FHTL.treeSweeper, 
            name: 'Tree Sweeper'
          } //TODO add brownie in the future
        ]
      },
      {
        title: 'Visualize',
        links: [
          {
            href: links.FHTL.pedigreePie,
            name: 'Pedigree Pie'
          },
          {
            href: links.FHTL.onePageGenealogy, 
            name: 'One Page Genealogy'
          },
          {
            href: links.FHTL.familyCalendar,
            name: 'Family Calendar'
          }
        ]
      },
      {
        title: 'Play',
        links: [
          {
            href: links.FHTL.geneopardy,
            name: 'Geneopardy'
          },
          {
            href: links.FHTL.wheelOfFamilyFortune, 
            name: 'Wheel of Family Fortune'
          },
          {
            href: links.FHTL.ancestorGames,
            name: 'Ancestor Games'
          },
          {
            href: links.FHTL.recordQuest, 
            name: 'Record Quest'
          }
        ]
      }
    ]
  }

  ngOnInit() {
  }

}
