package com.exampleBackend.TruckTrackBackend.Response;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.exampleBackend.TruckTrackBackend.Request.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
