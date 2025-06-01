import React from 'react';

export default function BrandLogo({ src, alt }) {
    return (
        <img
            src={src}
            alt={alt}
            className="h-16 w-32 object-contain mx-auto"
        />
    );
}
