
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About Digital Intelligence</h1>
          
          <div className="space-y-12">
            <section className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p className="text-muted-foreground mb-4">
                At Digital Intelligence Marketplace, our vision is to democratize access to AI tools and knowledge,
                making these powerful technologies accessible to everyone regardless of their technical background or profession.
              </p>
              <p className="text-muted-foreground mb-4">
                We believe that AI should not be limited to tech experts or large corporations. Instead, it should be a
                tool that empowers individuals and small businesses to achieve more, work smarter, and solve problems
                more effectively.
              </p>
            </section>
            
            <section className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-lg border bg-card">
                  <h3 className="text-lg font-medium mb-2">Accessibility</h3>
                  <p className="text-sm text-muted-foreground">
                    Make AI tools and knowledge accessible to everyone, regardless of technical expertise or budget.
                  </p>
                </div>
                <div className="p-6 rounded-lg border bg-card">
                  <h3 className="text-lg font-medium mb-2">Education</h3>
                  <p className="text-sm text-muted-foreground">
                    Provide clear, practical education that helps users understand and leverage AI in their work and lives.
                  </p>
                </div>
                <div className="p-6 rounded-lg border bg-card">
                  <h3 className="text-lg font-medium mb-2">Community</h3>
                  <p className="text-sm text-muted-foreground">
                    Build a supportive community where users can share experiences, ask questions, and grow together.
                  </p>
                </div>
              </div>
            </section>
            
            <section className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
              <p className="text-muted-foreground mb-6">
                Digital Intelligence Marketplace is built by a team of AI enthusiasts, educators, and technologists
                who share a passion for making advanced technology accessible to everyone.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-6 rounded-lg border bg-card flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-muted mb-4"></div>
                    <h3 className="text-lg font-medium">Team Member {i}</h3>
                    <p className="text-sm text-muted-foreground mb-2">Position</p>
                    <p className="text-sm text-muted-foreground">
                      A brief bio about this team member and their expertise in AI or education.
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
