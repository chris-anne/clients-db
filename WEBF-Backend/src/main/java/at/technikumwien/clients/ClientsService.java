package at.technikumwien.clients;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class ClientsService {
	@PersistenceContext
	private EntityManager em;
	
	public List<Clients> getAllClients() {
		return em.createNamedQuery("Clients.selectAll", Clients.class)
			.getResultList();
	}
	
	public List<Clients> getClientsByName(String name) {
		return em.createNativeQuery("SELECT * FROM t_clients WHERE firstname='" + name + "'", Clients.class).getResultList();
	}
}