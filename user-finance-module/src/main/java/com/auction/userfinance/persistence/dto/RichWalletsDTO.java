package com.auction.userfinance.persistence.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class RichWalletsDTO {
    private String name;
    private BigDecimal balance;
}