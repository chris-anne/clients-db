package at.technikumwien.clients;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;

@Entity
@Table(name="t_clients")
@NamedQuery(name="Clients.selectAll", query="SELECT c FROM Clients c")
@XmlAccessorType(XmlAccessType.FIELD)
public class Clients {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	@XmlAttribute
	private Long id;
	
	@Column(length=25, nullable=false)
	@XmlAttribute
	private String firstname;
	
	@Column(length=25, nullable=false)
	@XmlAttribute
	private String lastname;
	
	@Temporal(TemporalType.DATE)
	@Column(nullable=false)
	@XmlAttribute
	private Date birthday;
	
	@Column
	@XmlAttribute
	private boolean activated;
	
	public Clients() {}

	
	
	public Clients(String vorname, String nachname, Date birthday, boolean aktiviert) {
		this.firstname = vorname;
		this.lastname = nachname;
		this.birthday = birthday;
		this.activated = aktiviert;
	}

	public Clients(Long id, String vorname, String nachname, Date birthday, boolean aktiviert) {
		this.id = id;
		this.firstname = vorname;
		this.lastname = nachname;
		this.birthday = birthday;
		this.activated = aktiviert;
	}

	

	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getVorname() {
		return firstname;
	}



	public void setVorname(String vorname) {
		this.firstname = vorname;
	}



	public String getNachname() {
		return lastname;
	}



	public void setNachname(String nachname) {
		this.lastname = nachname;
	}

	
	
	public Date getBirthday() {
		return birthday;
	}



	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}



	public boolean isAktiviert() {
		return activated;
	}



	public void setAktiviert(boolean aktiviert) {
		this.activated = aktiviert;
	}



	@Override
	public String toString() {
		return "Kunde [Vorname=" + firstname + " Nachname=" + lastname + ", Geburtstag=" + birthday + ", aktiviert=" + activated +"]";
	}
}