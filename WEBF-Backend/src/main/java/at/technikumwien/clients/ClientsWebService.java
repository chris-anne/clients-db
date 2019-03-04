package at.technikumwien.clients;

import java.util.List;

import javax.inject.Inject;
import javax.jws.WebService;

@WebService
public class ClientsWebService {
	@Inject
	private ClientsService clientsService;
	
	public List<Clients> getAllData() {
		return clientsService.getAllClients();
	}
	
	public List<Clients> filterData(String name) {
		return clientsService.getClientsByName(name);
	}
}