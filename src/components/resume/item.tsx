import React, { ReactElement } from 'react';

const createListItems = (items: ReactElement[]) => {
  return items.map((i) => <li style={{ color: 'hsl(0, 0%, 29%)' }}>{i}</li>);
};

interface ResumeItemProps {
  role: string;
  dateRange: string;
  organization: ReactElement;
  responsibilities: ReactElement[];
}

const ResumeItem = ({
  role,
  dateRange,
  organization,
  responsibilities,
}: ResumeItemProps) => {
  return (
    <li className="portfolio-item">
      <div style={{ fontWeight: 'bold' }}>{role}</div>
      <p style={{ color: 'hsl(0, 0%, 29%)' }}>
        {dateRange} | {organization}{' '}
      </p>
      <ul>{createListItems(responsibilities)}</ul>
    </li>
  );
};

export default ResumeItem;
