package com.auction.userfinance.persistence.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class VIPUsersTransactionsAmountDTO {
    private String name;
    private String email;
    private BigDecimal transactionsAmount;
}
