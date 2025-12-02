package com.candystore.repository;

import com.candystore.model.LoginLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LoginLogRepository extends JpaRepository<LoginLog, Long> {
    List<LoginLog> findTop20ByOrderByDataHoraDesc();
}
