import BadgeCard from './BadgeCard';

const badges = [
  { image: '/badges/arrays.png', taskName: 'Arrays' },
  { image: '/badges/dynamic.png', taskName: 'Dynamic Programming' },
  { image: '/badges/graphs.png', taskName: 'Graphs' },
  { image: '/badges/indexing.png', taskName: 'Indexing (SQL)' },
  { image: '/badges/interview.png', taskName: 'Interview Questions' },
  { image: '/badges/joins.png', taskName: 'Joins (SQL)' },
  { image: '/badges/linkedlist.png', taskName: 'Linked List' },
  { image: '/badges/queries.png', taskName: 'Select Queries (SQL)' },
  { image: '/badges/queues.png', taskName: 'Queues' },
  { image: '/badges/stacks.png', taskName: 'Stacks' },
  { image: '/badges/storedprocedures.png', taskName: 'Stored Procedures (SQL)' },
  { image: '/badges/subqueries.png', taskName: 'Subqueries (SQL)' },
  { image: '/badges/trees.png', taskName: 'Trees' },
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-10">
      <h2 className="text-4xl font-bold text-center text-cyan-400 mb-12 drop-shadow-md">
        🏅 Your Earned Badges
      </h2>
      <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-7xl mx-auto">
        {badges.map((badge, index) => (
          <BadgeCard key={index} image={badge.image} taskName={badge.taskName} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
