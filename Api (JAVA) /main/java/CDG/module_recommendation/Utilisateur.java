/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package CDG.module_recommendation;

import javax.persistence.AttributeConverter;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

import javax.persistence.ManyToOne;

import javax.persistence.SequenceGenerator;
import javax.validation.constraints.NotNull;
import javax.persistence.Converter;
import javax.persistence.GenerationType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import org.springframework.data.relational.core.mapping.Embedded;

/**
 *
 * @author admin
 */
enum Type {
    Auditeur_interne("auditeur interne"), Responsable_opérationel("responsable opérationel"),
    Responsable_audit("responsable audit");

    private static String value;

    Type() {
    }

    public static String setValue(String value) {
        Type.value = value;
    }

    public static String getValue() {
        return value;
    }

}

@Converter(autoApply = true)
class PriorityJpaConverter implements AttributeConverter<Type, String> {

    @Override
    public String convertToDatabaseColumn(Type priority) {
        switch (priority) {
            case Auditeur_interne:
                return "Auditeur interne";
            case Responsable_opérationel:
                return "Responsable opérationel";
            case Responsable_audit:
                return "Responsable audit";
            default:

                throw new IllegalArgumentException("Invalid value " + priority);
        }
    }

    @Override
    public Type convertToEntityAttribute(String string) {
        switch (string) {
            case "Auditeur interne":
                return Type.Auditeur_interne;
            case "Responsable opérationel":
                return Type.Responsable_opérationel;
            case "Responsable audit":
                return Type.Responsable_audit;
        }

        return null;
    }

}

@Entity
@SequenceGenerator(name = "utilisateur_seq", sequenceName = "utilisateur_seq", initialValue = 1, allocationSize = 1)
public class Utilisateur {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "utilisateur_seq")
    private Integer id;

    @NotBlank(message = "le nom ne peut pas être vide")
    private String nom;

    @NotBlank(message = "le prénom ne peut pas être vide")
    private String prenom;

    @Enumerated(EnumType.STRING)
    @NotNull
    @Convert(converter = PriorityJpaConverter.class)
    private Type type;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id", nullable = true)
    private structure structure;

    public Utilisateur() {
    }

    public Utilisateur(String nom, String prenom, Type type, structure structure) {
        this.nom = nom;
        this.prenom = prenom;
        this.type = type;
        this.structure = structure;
    }

    public Integer getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Type getType() {
        return type;
    }

    public structure getStructure() {
        return structure;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public void setStructure(structure structure) {
        this.structure = structure;
    }

}
