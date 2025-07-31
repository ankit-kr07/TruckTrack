package com.exampleBackend.TruckTrackBackend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exampleBackend.TruckTrackBackend.Request.Ticket;
import com.exampleBackend.TruckTrackBackend.Response.TicketRepository;

@Service
public class TicketService {
    @Autowired
    private TicketRepository ticketRepo;

    public List<Ticket> getAllTickets() {
        return ticketRepo.findAll();
    }

    public Ticket getTicket(Long id) {
        return ticketRepo.findById(id).orElse(null);
    }

    public Ticket saveTicket(Ticket ticket) {
        return ticketRepo.save(ticket);
    }

    public void deleteTicket(Long id) {
        ticketRepo.deleteById(id);
    }
}

