import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ImpactUpdate {
  id: string;
  title: string;
  description: string;
  date: string;
  impact: string;
}

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  impactUpdates: ImpactUpdate[] = [
    {
      id: 'impact-1',
      title: 'Awarded $50,000 in Scholarships',
      description:
        'In 2024, the Zonta Club of Naples distributed over $50,000 in scholarships to deserving women pursuing higher education and professional development.',
      date: 'November 2024',
      impact: '$50,000 distributed to 8 scholarship recipients',
    },
    {
      id: 'impact-2',
      title: 'Violence Prevention Initiative',
      description:
        'Our club launched a comprehensive violence prevention program in partnership with local organizations, providing self-defense training and resources to over 150 women.',
      date: 'October 2024',
      impact: '150+ women educated on safety resources and support services',
    },
    {
      id: 'impact-3',
      title: 'Mentorship Program Launch',
      description:
        'We established a formal mentorship program connecting 25 professional women mentors with 25 young women seeking guidance in their career journeys.',
      date: 'September 2024',
      impact: '25 mentorship pairs created with ongoing support',
    },
    {
      id: 'impact-4',
      title: 'Community Leadership Summit',
      description:
        'Hosted a gathering of 100+ women leaders from Naples to discuss challenges, share experiences, and collaborate on community initiatives.',
      date: 'August 2024',
      impact: '100+ women leaders connected and engaged',
    },
    {
      id: 'impact-5',
      title: 'Education Access Project',
      description:
        'Provided school supplies, educational resources, and financial assistance to underprivileged girls in local schools to ensure continued education.',
      date: 'July 2024',
      impact: '75 girls received educational resources and support',
    },
    {
      id: 'impact-6',
      title: 'Economic Empowerment Workshop',
      description:
        'Conducted financial literacy and entrepreneurship workshops reaching 80 women seeking to build sustainable economic independence.',
      date: 'June 2024',
      impact: '80 women trained in financial literacy and business basics',
    },
  ];
}
