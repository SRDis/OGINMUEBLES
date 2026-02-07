interface StructuredDataProps {
  type: string;
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'LocalBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          ...data,
        };
      
      case 'RealEstateAgent':
        return {
          '@context': 'https://schema.org',
          '@type': 'RealEstateAgent',
          ...data,
        };
      
      case 'Property':
        return {
          '@context': 'https://schema.org',
          '@type': 'Property',
          ...data,
        };
      
      case 'BreadcrumbList':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data.items,
        };
      
      default:
        return data;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
    />
  );
}
