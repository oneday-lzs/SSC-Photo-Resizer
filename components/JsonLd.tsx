import React from 'react';

type JsonLdProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: Record<string, any> | Array<Record<string, any>>;
};

/**
 * Server Component to render JSON-LD script tag with XSS-safe encoding
 */
export function JsonLd({ schema }: JsonLdProps) {
  // Prevent XSS injection in raw JSON script tag
  const jsonString = JSON.stringify(schema).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}

export default JsonLd;
