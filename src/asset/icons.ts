
import React from 'react';

export const CircleTickIcon: React.FC<{ width?: number; height?: number; fill?: string }> = ({ width = 24, height = 24, fill = '#e3e3e3' }) => {
    return React.createElement(
        'svg',
        {
            xmlns: 'http://www.w3.org/2000/svg',
            height,
            viewBox: '0 -960 960 960',
            width,
            fill
        },
        React.createElement('path', {
            d: 'm424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z'
        })
    );
};



export const SearchIcon: React.FC<{ width?: number; height?: number; fill?: string }> = ({
    width = 24,
    height = 24,
    fill = '#e3e3e3'
}) => React.createElement(
    'svg',
    {
        xmlns: 'http://www.w3.org/2000/svg',
        height,
        viewBox: '0 -960 960 960',
        width,
        fill
    },
    React.createElement('path', {
        d: 'M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z'
    })
);
