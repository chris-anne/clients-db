package at.technikumwien.clients;

import java.net.URI;
import java.util.List;
import java.util.logging.Logger;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.core.Response.Status;

@Path("/clients")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ClientsResource {
	private static final Logger LOGGER = Logger.getLogger(ClientsResource.class.getName()); 
	
	@PersistenceContext
	private EntityManager em;
	@Inject
	private ClientsService clientService;
	@Context
	private UriInfo uriInfo;
	
	@POST
	@Transactional
	public Response create(Clients client) {
		LOGGER.info("create >> client=" + client);
		
		em.persist(client);
		URI uri = uriInfo.getAbsolutePathBuilder().path(client.getId().toString()).build();
		return Response.created(uri).build();
	}
	
	@GET
	@Path("/{id}")
	public Clients retrieve(@PathParam("id") long id) {
		LOGGER.info("retrieve >> id=" + id);
		
		return em.find(Clients.class, id);
	}
	
	@PUT
	@Path("/{id}")
	@Transactional
	public void update(@PathParam("id") long id, Clients clientNew) {
		LOGGER.info("update >> id=");

		Clients clientsList = em.find(Clients.class, id);
		if (clientsList != null) {
			clientsList.setVorname(clientNew.getVorname());
			clientsList.setNachname(clientNew.getNachname());
			clientsList.setBirthday(clientNew.getBirthday());
			clientsList.setAktiviert(clientNew.isAktiviert());
		}
		else {
			throw new WebApplicationException(Status.NOT_FOUND);
		}
	}
	
	@DELETE
	@Path("/{id}")
	@Transactional
	public void delete(@PathParam("id") long id) {
		LOGGER.info("delete >> id=" + id);
		
		Clients client = em.find(Clients.class, id);
		if (client != null) {
			em.remove(client);
		}
		else {
			throw new WebApplicationException(Status.NOT_FOUND);
		}
	}	
	
	@GET
	public List<Clients> retrieveAll() {
		LOGGER.info("retrieveAll");

		return clientService.getAllClients();  
	}
	
	/*@GET
	@Path("/{name}")
	public List<Clients> retrieve(@PathParam("name") String name) {
		LOGGER.info("retrieve >> name=" + name);
		
		return clientService.getClientsByName(name);
	}*/
}