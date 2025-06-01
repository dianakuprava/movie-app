import { Tabs } from 'antd';
import SearchTab from '../SearchTab/SearchTab';
import RatedTab from '../RatedTab/RatedTab.jsx';
import './AppTabs.css';

export default function AppTabs({ sessionId, onRatingUpdate, ratedUpdateKey }) {
  const items = [
    {
      key: 'search',
      label: 'Search',
      children: <SearchTab sessionId={sessionId} onRatingUpdate={onRatingUpdate} />,
    },
    {
      key: 'rated',
      label: 'Rated',
      children: <RatedTab sessionId={sessionId} key={ratedUpdateKey} />,
    },
  ];

  return (
    <div className="app-tabs">
      <Tabs defaultActiveKey="search" items={items} centered className="custom-tabs" />
    </div>
  );
}
