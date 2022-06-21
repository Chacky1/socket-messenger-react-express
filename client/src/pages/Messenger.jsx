import React from 'react';
import MainDashboardMessaging from '../components/MainDashboardMessaging';
import Header from '../components/Header';

function Messenger() {
  return (
    <div className="home">
      <Header />
      <section className="messenger">
        <MainDashboardMessaging />
      </section>
    </div>
  );
}

export default Messenger;
