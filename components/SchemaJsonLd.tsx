type Props = { data: Record<string, unknown> | Record<string, unknown>[] };

export default function SchemaJsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
