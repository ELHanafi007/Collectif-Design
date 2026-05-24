import PolicyPage from '@/components/layout/PolicyPage';

export default function LivraisonPage() {
  return (
    <PolicyPage
      eyebrow="Service"
      title="Livraison"
      intro="Collectif Design accompagne chaque livraison avec une approche claire: confirmation, préparation, transport et suivi après réception."
      sections={[
        {
          title: 'Zones',
          body: 'La livraison est disponible au Maroc. Les délais et frais éventuels sont confirmés selon la ville, le volume et la nature des pièces sélectionnées.',
        },
        {
          title: 'Délais',
          body: 'Les articles disponibles peuvent être préparés rapidement. Les pièces sur mesure ou packs complets demandent un délai confirmé après validation des finitions.',
        },
        {
          title: 'Installation',
          body: 'Lorsque le produit le nécessite, l’équipe peut organiser une livraison avec mise en place. Les contraintes d’accès doivent être signalées avant confirmation.',
        },
        {
          title: 'Réception',
          body: 'Nous recommandons de vérifier l’état des pièces à la réception et de signaler toute réserve immédiatement afin de faciliter le suivi.',
        },
      ]}
    />
  );
}
