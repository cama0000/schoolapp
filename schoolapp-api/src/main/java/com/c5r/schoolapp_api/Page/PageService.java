package com.c5r.schoolapp_api.Page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class PageService {
    @Autowired
    private PageRepository pageRepository;

    public Page save(Page page){ return pageRepository.save(page);}

    public Set<Page> findPagesByCourse(Long id){ return pageRepository.findByCourseId(id); }
}
