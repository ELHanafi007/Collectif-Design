import PolicyPage from '@/components/layout/PolicyPage';

export default function ConfidentialitePage() {
  return (
    <PolicyPage
      eyebrow="Politique"
      title="Confidentialité"
      intro="Collectif Design collecte uniquement les informations nécessaires pour répondre aux demandes, préparer les devis et organiser les livraisons."
      sections={[
        {
          title: 'Données collectées',
          body: 'Nous pouvons recevoir votre nom, numéro de téléphone, adresse e-mail, ville, adresse de livraison et détails de projet lorsque vous utilisez nos formulaires, WhatsApp ou le panier de devis.',
        },
        {
          title: 'Utilisation',
          body: 'Ces informations servent à traiter votre demande, vous recontacter, confirmer les produits sélectionnés, organiser une visite showroom ou préparer une livraison.',
        },
        {
          title: 'Conservation',
          body: 'Les demandes sont conservées pendant la durée nécessaire au suivi commercial et au service client. Vous pouvez demander une correction ou suppression en nous contactant.',
        },
        {
          title: 'Partage',
          body: 'Collectif Design ne vend pas vos données. Elles peuvent être partagées uniquement avec des prestataires nécessaires à la livraison, au paiement ou à la gestion technique du site.',
        },
      ]}
    />
  );
}
