import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

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
  teamMembers: TeamMember[] = [
    {
      id: 'member-1',
      name: 'Patricia Martinez',
      role: 'President',
      bio: 'Patricia has been leading the Zonta Club of Naples since 2021, bringing 15 years of community service experience and a passion for women empowerment.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    },
    {
      id: 'member-2',
      name: 'Jennifer Lee',
      role: 'Vice President',
      bio: 'Jennifer oversees our scholarship programs and has personally mentored over 50 young women in pursuing higher education and career development.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
      id: 'member-3',
      name: 'Amanda Sullivan',
      role: 'Treasurer',
      bio: 'Amanda manages our fundraising initiatives and ensures our resources are effectively allocated to support our mission of empowering women.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    },
    {
      id: 'member-4',
      name: 'Diana Foster',
      role: 'Secretary',
      bio: 'Diana coordinates our community events and serves as the primary liaison between the Naples club and the broader Zonta International organization.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=400&fit=crop',
    },
    {
      id: 'member-5',
      name: 'Rachel Thompson',
      role: 'Service Chair',
      bio: 'Rachel leads our community service projects and advocacy work, focusing on gender equality and violence prevention initiatives.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=400&h=400&fit=crop',
    },
    {
      id: 'member-6',
      name: 'Michelle Davis',
      role: 'Membership Chair',
      bio: 'Michelle welcomes new members and ensures our club remains a vibrant community of women dedicated to making a positive difference.',
      image: 'https://images.unsplash.com/photo-1517841905240-74f9c619c96f?w=400&h=400&fit=crop',
    },
  ];

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
