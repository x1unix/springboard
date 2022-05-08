import React from 'react';
import { ShortcutGroups, extrapolateUrl } from '../../config/config';
import Group from '../Group';
import Shortcut from '../Shortcut';

interface Props {
  categories?: ShortcutGroups
}

const AppsList: React.FC<Props> = ({ categories }) => (
  <>
    {Object.entries(categories ?? {}).map(([category, items]) => (
      <Group title={category} key={category}>
        {items?.map(({ title, description, url, iconUrl }, i) => (
          <Shortcut
            key={i}
            title={title}
            subTitle={description}
            iconUrl={iconUrl}
            href={extrapolateUrl(url)}
            style={{ height: '100%' }}
          />
        ))}
      </Group>
    ))}
  </>
);

export default AppsList;
