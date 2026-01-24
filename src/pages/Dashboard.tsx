import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import Footer from "../components/footer";
import { Ticket, CheckCircle, Clock, LogOut, Plus, Users } from "lucide-react";
import { useEffect, useState } from "react";

interface TicketStats {
  total: number;
  open: number;
  inProgress: number;
  closed: number;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<TicketStats>({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0,
  });

  useEffect(() => {
    // Load ticket statistics from localStorage
    const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    const stats = {
      total: tickets.length,
      open: tickets.filter((t: any) => t.status === "open").length,
      inProgress: tickets.filter((t: any) => t.status === "in_progress").length,
      closed: tickets.filter((t: any) => t.status === "closed").length,
    };
    setStats(stats);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <Ticket className="w-4 h-4 text-primary-foreground" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                TicketFlow
              </h1>
              <p className="text-sm text-muted-foreground">
                Welcome back, <span className="font-medium text-foreground">{user?.name}</span>
              </p>
            </div>
          </div>
          <Button
            onClick={logout}
            variant="outline"
            size="sm"
          >
            <LogOut className="w-4 h-4 mr-2" aria-hidden="true" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">
              Dashboard Overview
            </h2>
            <p className="text-muted-foreground">
              Track and manage your team's tickets with real-time insights
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Total Tickets */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Tickets
                </CardTitle>
                <Ticket className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stats.total}</div>
                <p className="text-xs text-muted-foreground">
                  All time tickets created
                </p>
              </CardContent>
            </Card>

            {/* Open Tickets */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Open Tickets
                </CardTitle>
                <Ticket className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stats.open}
                </div>
                <p className="text-xs text-muted-foreground">
                  Awaiting action
                </p>
              </CardContent>
            </Card>

            {/* In Progress */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  In Progress
                </CardTitle>
                <Clock className="w-4 h-4 text-secondary-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stats.inProgress}
                </div>
                <p className="text-xs text-muted-foreground">
                  Being worked on
                </p>
              </CardContent>
            </Card>

            {/* Resolved */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Resolved
                </CardTitle>
                <CheckCircle className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stats.closed}
                </div>
                <p className="text-xs text-muted-foreground">
                  Completed tickets
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/tickets" className="group">
                <Button variant="secondary" className="w-full h-auto py-4 flex flex-col items-center justify-center gap-2 border border-border bg-card hover:bg-muted text-foreground p-6 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2">
                    <Ticket className="w-5 h-5" />
                    <span className="font-semibold">Manage Tickets</span>
                  </div>
                  <span className="text-sm text-muted-foreground">View and update existing tickets</span>
                </Button>
              </Link>
              <Link to="/tickets?action=create" className="group">
                <Button className="w-full h-auto py-4 flex flex-col items-center justify-center gap-2 p-6">
                  <div className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    <span className="font-semibold">Create Ticket</span>
                  </div>
                  <span className="text-sm text-primary-foreground/80">Add a new ticket to the system</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Additional Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Users className="w-5 h-5" />
                  Team Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <span className="text-sm font-medium text-muted-foreground">Resolution Rate</span>
                    <span className="text-sm font-bold text-foreground">
                      {stats.total > 0 ? Math.round((stats.closed / stats.total) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <span className="text-sm font-medium text-muted-foreground">Active Tickets</span>
                    <span className="text-sm font-bold text-foreground">
                      {stats.open + stats.inProgress}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <span className="text-sm font-medium text-muted-foreground">Efficiency Score</span>
                    <span className="text-sm font-bold text-foreground">
                      {stats.total > 0 ? Math.round((stats.closed / (stats.open + stats.inProgress || 1)) * 100) : 0}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    <p>Assign tickets to team members for faster resolution</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 flex-shrink-0" />
                    <p>Use priority levels to focus on critical issues</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                    <p>Regularly update ticket status to keep everyone informed</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-1.5 flex-shrink-0" />
                    <p>Use filters to quickly find tickets by status or priority</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;