import Card from "../common/Card";

function RecentActivity() {
  const activities = [ ];

  return (
    <section>
      <h2>Recent Activity</h2>

      <Card>
        {activities.length === 0 ? (
          <p>No activity recorded yet.</p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id}>
              <p>{activity.message}</p>
            </div>
          ))
        )}
      </Card>
    </section>
  );
}

export default RecentActivity;
