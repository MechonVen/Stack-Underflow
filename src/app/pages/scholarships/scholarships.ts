import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Scholarship {
  id: string;
  name: string;
  amount: string;
  description: string;
  eligibility: string[];
  deadline: string;
}

interface ApplicationForm {
  id: string;
  name: string;
  fileName: string;
  description: string;
}

@Component({
  selector: 'app-scholarships',
  imports: [CommonModule],
  templateUrl: './scholarships.html',
  styleUrl: './scholarships.scss',
})
export class Scholarships {
  scholarships: Scholarship[] = [
    {
      id: 'amelia-earhart',
      name: 'Amelia Earhart Fellowship',
      amount: '$10,000',
      description:
        'Awarded to women pursuing careers in science, technology, engineering, or mathematics (STEM).',
      eligibility: [
        'Women aged 18-30',
        'Currently enrolled in accredited institution',
        'Minimum 3.0 GPA',
        'Demonstrated commitment to STEM field',
      ],
      deadline: 'March 31, 2025',
    },
    {
      id: 'jane-addams',
      name: 'Jane Addams Fellowship',
      amount: '$7,500',
      description:
        'Supporting women leaders who are dedicated to community service and social advocacy.',
      eligibility: [
        'Women aged 18-35',
        'Active in community or volunteer work',
        'Enrolled in higher education or professional development',
        'Demonstrated leadership qualities',
      ],
      deadline: 'April 30, 2025',
    },
    {
      id: 'young-women',
      name: 'Young Women in Business',
      amount: '$5,000',
      description:
        'Empowering young women entrepreneurs and business professionals in their career journey.',
      eligibility: [
        'Women aged 18-28',
        'Pursuing business or entrepreneurship studies',
        'Minimum 2.75 GPA',
        'Business plan or career development goal required',
      ],
      deadline: 'May 31, 2025',
    },
  ];

  recipients: Recipient[] = [
    {
      id: 'recipient-1',
      name: 'Sarah Johnson',
      year: 2023,
      quote:
        'This scholarship gave me the opportunity to pursue my dreams in engineering without financial burden.',
      story:
        'Sarah graduated with a degree in Civil Engineering and now works on sustainable infrastructure projects. She credits the Amelia Earhart Fellowship with helping her focus on her studies.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    },
    {
      id: 'recipient-2',
      name: 'Maria Rodriguez',
      year: 2023,
      quote:
        'The support from Zonta helped me launch my nonprofit focused on women empowerment in underserved communities.',
      story:
        'Maria founded an organization that provides mentorship to young women from low-income backgrounds. The Jane Addams Fellowship was instrumental in helping her establish and grow her initiative.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
      id: 'recipient-3',
      name: 'Jessica Chen',
      year: 2024,
      quote:
        'As a first-generation college student, this scholarship removed barriers and let me dream bigger.',
      story:
        'Jessica is pursuing a business degree and has already started her own consulting firm. The Young Women in Business scholarship enabled her to dedicate more time to her academic and entrepreneurial goals.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    },
  ];

  applicationForms: ApplicationForm[] = [
    {
      id: 'general-application',
      name: 'General Application Form',
      fileName: 'zonta-scholarship-application-2025.pdf',
      description: 'Comprehensive application form for all Zonta Club Naples scholarships',
    },
    {
      id: 'essay-prompt',
      name: 'Essay Prompt Guide',
      fileName: 'zonta-essay-guidelines-2025.pdf',
      description: 'Guidelines and prompts for scholarship essays',
    },
    {
      id: 'recommendation-letter',
      name: 'Letter of Recommendation Template',
      fileName: 'zonta-recommendation-letter-template.pdf',
      description: 'Template for recommenders to complete',
    },
  ];

  downloadForm(form: ApplicationForm) {
    const link = document.createElement('a');
    link.href = `/assets/documents/${form.fileName}`;
    link.download = form.fileName;
    link.click();
  }
}
