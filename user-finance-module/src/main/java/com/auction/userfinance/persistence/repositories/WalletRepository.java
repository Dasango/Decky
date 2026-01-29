package com.auction.userfinance.persistence.repositories;

import com.auction.userfinance.persistence.dto.RichWalletsDTO;
import com.auction.userfinance.persistence.entities.Wallet;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class WalletRepository extends RepositoryBase<Wallet> {

    private EntityManager entityManager;

    @Inject
    public WalletRepository(EntityManager em) {
        super(em, Wallet.class);
        this.entityManager = em;
    }

    public List<RichWalletsDTO> getRichUsers(){
        String jpql= "SELECT new com.auction.userfinance.persistence.dto.RichWalletsDTO(u.name, w.balance)" +
                " FROM User u" +
                " JOIN u.wallet w" +
                " WHERE w.balance > 3*(" +
                " SELECT AVG(w2.balance)" +
                " FROM Wallet w2" +
                ")";
        return em.createQuery(jpql, RichWalletsDTO.class)
                .getResultList();
    }

}
