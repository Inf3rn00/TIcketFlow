import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import Footer from "../components/footer";
import {
  Ticket,
  CheckCircle,
  Clock,
  BarChart3,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary-foreground rounded-full px-3 py-1 mb-8">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Streamline your workflow</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-8 text-foreground">
                Manage tickets with <br />
                <span className="text-primary">unmatched clarity.</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
                The modern ticket management solution that helps teams track,
                manage, and resolve issues faster than ever before.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth/signup">
                  <Button size="lg" className="w-full sm:w-auto text-base">
                    Get Started Free
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/auth/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-base">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <img
                src="/Scrum board-cuate.png"
                alt="Team using scrum board for project management"
                className="w-full max-w-md h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Second Section: Image Left, Text Right */}
      <section className="py-24 border-b border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Side (Left) */}
            <div className="flex justify-between items-center order-2 lg:order-1">
              <img
                src="/Admin-cuate.png"
                alt="Productivity illustration"
                className="w-full max-w-md h-auto object-contain"
              />
            </div>

            {/* Text Side (Right) */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-foreground">
                Save time and focus on <br />
                <span style={{ color: '#8480BC' }}>what matters most.</span>
              </h2>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Eliminate the chaos of scattered requests. Centralize your <br /> workflow to reduce administrative overhead and get back <br /> to building great products.
              </p>

              <div className="space-y-4">
                {[
                  "Automated ticket routing",
                  "Smart prioritization",
                  "Instant status updates",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#8480BC]/10 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4" style={{ color: '#8480BC' }} />
                    </div>
                    <span className="text-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-semibold mb-4 text-foreground">
              Everything you need
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Powerful features designed to help your team stay organized,
              productive, and focused.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Ticket,
                title: "Create Tickets",
                description: "Quickly create and categorize tickets with detailed information.",
              },
              {
                icon: Clock,
                title: "Track Progress",
                description: "Monitor ticket status in real-time with clear visual indicators.",
              },
              {
                icon: CheckCircle,
                title: "Resolve Faster",
                description: "Streamlined workflows help your team resolve issues efficiently.",
              },
              {
                icon: BarChart3,
                title: "Analytics",
                description: "Get insights into your team's performance with comprehensive dashboards.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-lg border border-border bg-card hover:border-primary/20 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-md bg-secondary/10 flex items-center justify-center mb-6 text-primary">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6 text-foreground">
              Ready to transform your workflow?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Join thousands of teams who are already managing their tickets
              more efficiently with TicketFlow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/auth/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Schedule Demo
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-8">
              No credit card required • Free 14-day trial • Setup in minutes
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
