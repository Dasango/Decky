package com.auction.userfinance.repositories;

import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;
import java.util.Optional;

public abstract class RepositoryBase<T> {

    protected final EntityManager em;
    private final Class<T> entityClass;

    @Inject
    public RepositoryBase(EntityManager em, Class<T> entityClass) {
        this.em = em;
        this.entityClass = entityClass;
    }

    public void create(T obj) {
        try {
            em.getTransaction().begin();
            em.persist(obj);
            em.getTransaction().commit();

        } catch (Exception e) {
            if (em.getTransaction().isActive())
                em.getTransaction().rollback();
            e.printStackTrace();
        }
    }

    public void update(T obj) {
        try{
            em.getTransaction().begin();
            em.merge(obj);
            em.getTransaction().commit();
        } catch (RuntimeException e) {
            if (em.getTransaction().isActive())
                em.getTransaction().rollback();
            e.printStackTrace();
        }
    }

    public void delete(Object obj) {
        try{
            em.getTransaction().begin();
            var entity = em.contains(obj) ? obj: em.merge(obj);
            em.remove(entity);
            em.getTransaction().commit();
        } catch (RuntimeException e) {
            if (em.getTransaction().isActive())
                em.getTransaction().rollback();
            e.printStackTrace();
        }
    }

    public Optional<T> findById(Long id) {
        return Optional.ofNullable(em.find(entityClass, id));
    }

//    public List<T> findAll() {
//        String jpql = "SELECT e FROM " + entityClass.getSimpleName() + " e";
//        return em.createQuery(jpql, entityClass)
//                .getResultList();
//    }
    public List<T> findAll() {

        var cb = em.getCriteriaBuilder();
        var cq = cb.createQuery(entityClass);
        var rootEntry = cq.from(entityClass);
        var all = cq.select(rootEntry);

        return em.createQuery(all).getResultList();
    }
}