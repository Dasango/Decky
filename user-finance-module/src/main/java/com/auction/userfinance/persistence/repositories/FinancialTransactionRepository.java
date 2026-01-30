package com.auction.userfinance.persistence.repositories;

import com.auction.userfinance.persistence.entities.FinancialTransaction;
import com.auction.userfinance.persistence.entities.User;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class FinancialTransactionRepository extends  RepositoryBase<FinancialTransaction>{

    protected EntityManager em;

    @Inject
    public FinancialTransactionRepository(EntityManager em) {
        super(em, FinancialTransaction.class);
        this.em = em;
    }

    public List<FinancialTransaction> getAllTransactionsByUser(User user){
        String jpql = "SELECT t FROM FinancialTransaction t" +
                " JOIN t.wallet w" +
                " JOIN w.user u" +
                " WHERE u = :user" +
                " ORDER BY t.timestamp DESC";
        return this.em.createQuery(jpql,FinancialTransaction.class)
                .setParameter("user",user)
                .getResultList();
    }

}