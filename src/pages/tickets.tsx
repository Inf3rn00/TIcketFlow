import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textArea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import Footer from "../components/footer";
import { toast } from "sonner";
import { z } from "zod";
import { Ticket, Plus, Edit2, Trash2, LogOut, X, ArrowLeft, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

interface TicketType {
  id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string;
}

const ticketSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title must be less than 100 characters" }),
  description: z
    .string()
    .trim()
    .max(500, { message: "Description must be less than 500 characters" })
    .optional(),
  status: z.enum(["open", "in_progress", "closed"], {
    message: "Status must be open, in_progress, or closed",
  }),
  priority: z.enum(["low", "medium", "high"]).optional(),
});

const Tickets = () => {
  const { logout } = useAuth();
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingTicket, setEditingTicket] = useState<TicketType | null>(null);
  const [deletingTicket, setDeletingTicket] = useState<TicketType | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    status: "open" | "in_progress" | "closed";
    priority: "low" | "medium" | "high";
  }>({
    title: "",
    description: "",
    status: "open",
    priority: "medium",
  });

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = () => {
    const savedTickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    setTickets(savedTickets);
  };

  const saveTickets = (updatedTickets: TicketType[]) => {
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    setTickets(updatedTickets);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "open",
      priority: "medium",
    });
    setErrors({});
    setIsCreating(false);
    setEditingTicket(null);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({
      title: "",
      description: "",
      status: "open",
      priority: "medium",
    });
  };

  const handleEdit = (ticket: TicketType) => {
    setEditingTicket(ticket);
    setFormData({
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      ticketSchema.parse(formData);

      if (editingTicket) {
        // Update existing ticket
        const updatedTickets = tickets.map((t) =>
          t.id === editingTicket.id ? { ...t, ...formData } : t
        );
        saveTickets(updatedTickets);
        toast.success("Ticket updated successfully");
      } else {
        // Create new ticket
        const newTicket: TicketType = {
          id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString(),
        };
        saveTickets([...tickets, newTicket]);
        toast.success("Ticket created successfully");
      }

      resetForm();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast.error("Please fix the validation errors");
      }
    }
  };

  const confirmDelete = () => {
    if (deletingTicket) {
      const updatedTickets = tickets.filter((t) => t.id !== deletingTicket.id);
      saveTickets(updatedTickets);
      toast.success("Ticket deleted successfully");
      setDeletingTicket(null);
    }
  };

  const getStatusVariant = (status: string) => {
    const mapping: Record<
      string,
      "open" | "in_progress" | "closed" | "default"
    > = {
      open: "open",
      in_progress: "in_progress",
      closed: "closed",
    };
    return mapping[status] || "default";
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      open: "Open",
      in_progress: "In Progress",
      closed: "Closed",
    };
    return labels[status as keyof typeof labels] || status;
  };



  const filteredTickets = statusFilter === "all"
    ? tickets
    : tickets.filter(ticket => ticket.status === statusFilter);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                  <ArrowLeft className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">
                    TicketFlow
                  </h1>
                  <p className="text-sm text-muted-foreground hidden sm:inline">
                    Ticket Management
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                Dashboard
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Ticket Management
              </h2>
              <p className="text-muted-foreground">
                Create, view, edit, and manage all your tickets
              </p>
            </div>
            {!isCreating && !editingTicket && (
              <Button
                onClick={handleCreate}
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Ticket
              </Button>
            )}
          </div>

          {/* Filters */}
          {!isCreating && !editingTicket && tickets.length > 0 && (
            <div className="flex items-center gap-4 mb-6">
              <Filter className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tickets</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Badge variant="outline">
                {filteredTickets.length} {filteredTickets.length === 1 ? 'ticket' : 'tickets'}
              </Badge>
            </div>
          )}

          {/* Create/Edit Form */}
          {(isCreating || editingTicket) && (
            <Card className="mb-8">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Ticket className="w-5 h-5" aria-hidden="true" />
                    {editingTicket ? "Edit Ticket" : "Create New Ticket"}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={resetForm}
                    aria-label="Close form"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Enter ticket title"
                      aria-invalid={!!errors.title}
                      className="bg-background"
                    />
                    {errors.title && (
                      <p className="text-sm text-destructive font-medium">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Provide details about the ticket..."
                      rows={4}
                      aria-invalid={!!errors.description}
                      className="bg-background resize-none"
                    />
                    {errors.description && (
                      <p className="text-sm text-destructive font-medium">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="status">Status *</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value: any) =>
                          setFormData({ ...formData, status: value })
                        }
                      >
                        <SelectTrigger id="status" className="bg-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in_progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.status && (
                        <p className="text-sm text-destructive font-medium">
                          {errors.status}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value: any) =>
                          setFormData({ ...formData, priority: value })
                        }
                      >
                        <SelectTrigger id="priority" className="bg-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="submit">
                      {editingTicket ? "Update Ticket" : "Create Ticket"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Tickets List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTickets.length === 0 ? (
              <Card className="col-span-full p-12 text-center">
                <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center mx-auto mb-4">
                  <Ticket className="w-8 h-8 text-muted-foreground" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No tickets found</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  {statusFilter === "all"
                    ? "Create your first ticket to get started with TicketFlow"
                    : `No ${statusFilter.replace('_', ' ')} tickets found`
                  }
                </p>
                <Button onClick={handleCreate}>
                  <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
                  Create Ticket
                </Button>
              </Card>
            ) : (
              filteredTickets.map((ticket) => (
                <Card key={ticket.id} className="group">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-2">
                      <CardTitle className="text-lg text-foreground line-clamp-2">
                        {ticket.title}
                      </CardTitle>
                      <Badge
                        variant={getStatusVariant(ticket.status)}
                      >
                        {getStatusLabel(ticket.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    {ticket.description && (
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                        {ticket.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-xs">
                      <span className={`px-2 py-1 rounded-md border text-muted-foreground font-medium capitalize`}>
                        {ticket.priority}
                      </span>
                      <span className="text-muted-foreground">
                        {new Date(ticket.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2 pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEdit(ticket)}
                    >
                      <Edit2 className="w-3 h-3 mr-1" aria-hidden="true" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                      onClick={() => setDeletingTicket(ticket)}
                    >
                      <Trash2 className="w-3 h-3 mr-1" aria-hidden="true" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingTicket}
        onOpenChange={() => setDeletingTicket(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the ticket <span className="font-semibold text-foreground">"{deletingTicket?.title}"</span>.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Ticket
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
};

export default Tickets;