// src/LeetCodeStats.tsx
import React from 'react';

interface LeetCodeStatsProps {
  username: string;
  theme?: string;
  font?: string;
  width?: number;
  height?: number;
  border?: number;
  radius?: number;
  animation?: boolean;
  hide?: string;
  ext?: string;
  cache?: number;
  sheets?: string;
}

const LeetCodeStats: React.FC<LeetCodeStatsProps> = ({
  username,
  theme = 'light',
  font = 'Baloo_2',
  width = 500,
  height = 200,
  border = 1,
  radius = 4,
  animation = true,
  hide = '',
  ext = '',
  cache = 60,
  sheets = '',
}) => {
  const url = `https://leetcard.jacoblin.cool/${username}?theme=${theme}&font=${font}&width=${width}&height=${height}&border=${border}&radius=${radius}&animation=${animation}&hide=${hide}&ext=${ext}&cache=${cache}&sheets=${sheets}`;

  return (
    <div className="flex justify-center items-center h-full">
      <img src={url} alt={`${username}'s LeetCode stats`} className=" h-3/5 w-full object-cover" />
    </div>
  );
};

export default LeetCodeStats;
