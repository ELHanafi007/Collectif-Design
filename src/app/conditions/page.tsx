import PolicyPage from '@/components/layout/PolicyPage';

export default function ConditionsPage() {
  return (
    <PolicyPage
      eyebrow="Maison"
      title="Conditions"
      intro="Ces conditions cadrent les demandes de devis, les commandes, les produits sur mesure et les échanges avec Collectif Design."
      sections={[
        {
          title: 'Demandes de devis',
          body: 'Les prix affichés servent de base d’estimation. Un conseiller confirme les finitions, quantités, délais et conditions finales avant toute validation de commande.',
        },
        {
          title: 'Produits sur mesure',
          body: 'Les pièces personnalisées peuvent nécessiter un acompte et une validation écrite des dimensions, matières et couleurs. Les délais varient selon la complexité du projet.',
        },
        {
          title: 'Disponibilité',
          body: 'Certains produits peuvent être en stock limité ou produits à la demande. Collectif Design confirme la disponibilité avant la finalisation.',
        },
        {
          title: 'Retours',
          body: 'Les retours sont étudiés selon l’état du produit, sa nature standard ou personnalisée, et les conditions de livraison. Les produits sur mesure validés peuvent être exclus du retour.',
        },
      ]}
    />
  );
}
